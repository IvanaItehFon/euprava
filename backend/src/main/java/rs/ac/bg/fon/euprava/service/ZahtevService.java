package rs.ac.bg.fon.euprava.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.*;
import rs.ac.bg.fon.euprava.repository.KorisnikRepository;
import rs.ac.bg.fon.euprava.repository.OdgovorRepository;
import rs.ac.bg.fon.euprava.repository.StatistikaRepository;
import rs.ac.bg.fon.euprava.repository.ZahtevRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Random;

import static rs.ac.bg.fon.euprava.domain.Role.ADMIN;

@Service
@RequiredArgsConstructor
public class ZahtevService {

    private final KorisnikService korisnikService;
    private final ZahtevRepository zahtevRepository;
    private final PasosService pasosService;
    private final OdgovorRepository odgovorRepository;
    private final StatistikaRepository statistikaRepository;
    private final LicnaKartaService licnaKartaService;
    private final KorisnikRepository korisnikRepository;
    private final UpozorenjeService upozorenjeService;

    public Page<Zahtev> getAll(Pageable pageable) {
        if (korisnikService.getTrenutnoUlogovani().getRole().equals(ADMIN)) {
            return zahtevRepository.findAll(pageable);
        }
        return zahtevRepository.findByPodnosilac(korisnikService.getTrenutnoUlogovani(), pageable);
    }

    public Zahtev getById(Long id) {
        Zahtev zahtev = zahtevRepository.findById(id).orElseThrow(NoSuchElementException::new);
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovani();
        if (trenutnoUlogovaniKorisnik.getRole().equals(ADMIN)) {
            if (zahtev.getStatusZahteva().equals(StatusZahteva.PRIMLJEN)) {
                zahtev.setStatusZahteva(StatusZahteva.U_OBRADI);
                StatistikaObrade statistikaObrade = StatistikaObrade.builder()
                        .pocetkaObrade(LocalDateTime.now())
                        .obradjeno(false)
                        .zahtev(zahtev)
                        .build();
                statistikaRepository.save(statistikaObrade);
            }
            return zahtev;
        }
        if (!(zahtev.getPodnosilac().equals(trenutnoUlogovaniKorisnik))) {
            throw new NoSuchElementException();
        }
        return zahtev;
    }

    public Zahtev saveZahtev(Zahtev zahtev) {
        Korisnik trenutnoUlogovaniKorisnik = korisnikService.getTrenutnoUlogovani();
        zahtev.setPodnosilac(trenutnoUlogovaniKorisnik);
        zahtev.setStatusZahteva(StatusZahteva.PRIMLJEN);
        zahtev.setVremePodnosenja(LocalDateTime.now());
        return zahtevRepository.save(zahtev);
    }

    public Page<Zahtev> getAllByTipUsluge(TipUsluge tipUsluge, Pageable pageable) {
        return zahtevRepository.findByTipUsluge(tipUsluge, pageable);
    }

    public Page<Zahtev> getAllByKorisnik(Long korisnikId, Pageable pageable) {
        return zahtevRepository.findByPodnosilacId(korisnikId, pageable);
    }

    @Transactional
    public Odgovor razresi(Long zahtevId) {
        Zahtev zahtev = zahtevRepository.findById(zahtevId).orElseThrow(NoSuchElementException::new);
        return switch (zahtev.getTipUsluge()) {
            case IZDAVANJE_PASOSA -> razresiPasos(zahtev);
            case IZDAVANJE_LICNE_KARTE -> razresiLicnuKartu(zahtev);
            case PITANJA -> razresiPitanje(zahtev);
        };
    }

    public Odgovor razresiLicnuKartu(Zahtev zahtev) {
        Korisnik podnosilac = zahtev.getPodnosilac();
        licnaKartaService.invalidirajTrenutnuLicnuKartu(podnosilac);

        LicnaKarta licnaKarta = LicnaKarta.builder()
                .brojLicneKarte(new Random().nextLong())
                .datumIzdavanja(LocalDate.now())
                .datumVazenja(LocalDate.now().plusYears(2))
                .vlasnik(podnosilac)
                .build();

        LicnaKarta novaLicnaKarta = licnaKartaService.sacuvajLicnuKartu(licnaKarta);

        razresiStatus(zahtev);
        obrisiUpozorenjeZaLicnuKartu(podnosilac.getId(), podnosilac.getLicnaKarta().getId());

        podnosilac.setLicnaKarta(novaLicnaKarta);
        korisnikRepository.save(podnosilac);

        Odgovor odgovor = Odgovor.builder()
                .sadrzaj("Uspesno ste dobili novu licnu kartu: " + novaLicnaKarta)
                .zahtev(zahtev)
                .build();

        return odgovorRepository.save(odgovor);
    }

    public Odgovor razresiPasos(Zahtev zahtev) {
        Korisnik podnosilac = zahtev.getPodnosilac();
        pasosService.invalidirajTrenutniPasos(podnosilac);

        Pasos pasos = Pasos.builder()
                .brojPasosa(new Random().nextLong())
                .datumIzdavanja(LocalDate.now())
                .datumVazenja(LocalDate.now().plusYears(5))
                .vlasnik(podnosilac)
                .build();

        Pasos noviPasos = pasosService.sacuvajPasos(pasos);

        razresiStatus(zahtev);
        obrisiUpozorenjeZaPasos(podnosilac.getId(), podnosilac.getPasos().getId());

        podnosilac.setPasos(noviPasos);
        korisnikRepository.save(podnosilac);

        Odgovor odgovor = Odgovor.builder()
                .sadrzaj("Uspesno ste dobili novi pasos: " + noviPasos)
                .zahtev(zahtev)
                .build();

        return odgovorRepository.save(odgovor);
    }

    private void obrisiUpozorenjeZaLicnuKartu(Long korisnikId, Long licnaKartaId) {
        upozorenjeService.obrisiUpozorenjeZaLicnuKartu(korisnikId, licnaKartaId);
    }
    private void obrisiUpozorenjeZaPasos(Long korisnikId, Long pasosId) {
        upozorenjeService.obrisiUpozorenjeZaPasos(korisnikId, pasosId);
    }

    private Odgovor razresiPitanje(Zahtev zahtev) {
        return Odgovor.builder().sadrzaj("Ne znam kako odgovor").build();
    }

    private void razresiStatus(Zahtev zahtev) {
        zahtev.setStatusZahteva(StatusZahteva.RAZRESENO);
        zahtevRepository.save(zahtev);

        StatistikaObrade statistikaObrade = statistikaRepository.findByZahtevId(zahtev.getId()).orElseThrow(NoSuchElementException::new);
        statistikaObrade.setKrajObrade(LocalDateTime.now());
        statistikaObrade.setObradjeno(true);
        statistikaRepository.save(statistikaObrade);
    }
}
