package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;
import rs.ac.bg.fon.euprava.domain.Pasos;
import rs.ac.bg.fon.euprava.domain.Upozorenje;
import rs.ac.bg.fon.euprava.repository.UpozorenjeRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;

import static rs.ac.bg.fon.euprava.domain.Role.ADMIN;

@Service
@RequiredArgsConstructor
public class UpozorenjeService {

    private final UpozorenjeRepository upozorenjeRepository;
    private final KorisnikService korisnikService;
    private final LicnaKartaService licnaKartaService;
    private final PasosService pasosService;

    public Page<Upozorenje> getAll(Pageable pageable) {
        Korisnik trenutnoUlogovani = korisnikService.getTrenutnoUlogovani();
        if(trenutnoUlogovani.getRole().equals(ADMIN)) {
            return upozorenjeRepository.findAll(pageable);
        }
        return upozorenjeRepository.findByKorisnikId(trenutnoUlogovani.getId(), pageable);
    }

    public void proveriKorisnika(Korisnik korisnik) {
        proveriLicnuKartu(korisnik);
        proveriPasos(korisnik);
    }

    private void proveriLicnuKartu(Korisnik korisnik) {
        LicnaKarta licnaKarta = licnaKartaService.getByKorisnik(korisnik);

        if(upozorenjeRepository.existsByKorisnikIdAndLicnaKartaId(korisnik.getId(), licnaKarta.getId())) {
            return;
        }

        LocalDate vremeUpozorenja = licnaKarta.getDatumVazenja().minusDays(3);

        if(LocalDate.now().isAfter(vremeUpozorenja)) {
            Upozorenje upozorenje = Upozorenje.builder()
                    .vreme(LocalDateTime.now())
                    .sadrzaj("Postovani, istice vam licna karta datuma: " + licnaKarta.getDatumVazenja()
                            + "\nMolim zatrazite izdavanje nove licne karte!")
                    .licnaKarta(licnaKarta)
                    .korisnik(korisnik)
                    .build();
            upozorenjeRepository.save(upozorenje);
        }
    }

    private void proveriPasos(Korisnik korisnik) {
        Pasos pasos = pasosService.getByKorisnik(korisnik);

        if(upozorenjeRepository.existsByKorisnikIdAndPasosId(korisnik.getId(), pasos.getId())) {
            return;
        }

        LocalDate vremeUpozorenja = pasos.getDatumVazenja().minusDays(3);

        if(LocalDate.now().isAfter(vremeUpozorenja)) {
            Upozorenje upozorenje = Upozorenje.builder()
                    .vreme(LocalDateTime.now())
                    .sadrzaj("Postovani, istice vam pasos datuma: " + pasos.getDatumVazenja()
                    + "\nMolim zatrazite izdavanje novog pasosa!")
                    .pasos(pasos)
                    .korisnik(korisnik)
                    .build();
            upozorenjeRepository.save(upozorenje);
        }
    }

    public void obrisiUpozorenjeZaLicnuKartu(Long korisnikId, Long licnaKartaId) {
        Upozorenje upozorenje = upozorenjeRepository.findByKorisnikIdAndLicnaKartaId(korisnikId, licnaKartaId).orElseThrow(NoSuchElementException::new);
        upozorenjeRepository.delete(upozorenje);
    }

    public void obrisiUpozorenjeZaPasos(Long korisnikId, Long pasosId) {
        Upozorenje upozorenje = upozorenjeRepository.findByKorisnikIdAndPasosId(korisnikId, pasosId).orElseThrow(NoSuchElementException::new);
        upozorenjeRepository.delete(upozorenje);
    }
}
