package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;
import rs.ac.bg.fon.euprava.repository.KorisnikRepository;
import rs.ac.bg.fon.euprava.repository.LicnaKartaRepository;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class LicnaKartaService {

    private final LicnaKartaRepository licnaKartaRepository;
    private final KorisnikRepository korisnikRepository;

    public LicnaKarta sacuvajLicnuKartu(LicnaKarta licnaKarta) {
        return licnaKartaRepository.save(licnaKarta);
    }

    public void invalidirajTrenutnuLicnuKartu(Korisnik korisnik) {
        LicnaKarta licnaKarta = getByKorisnik(korisnik);
//        LicnaKarta licnaKarta = licnaKartaRepository.findByVlasnikId(korisnik.getId()).orElseThrow(NoSuchElementException::new);
        licnaKarta.setDatumVazenja(LocalDate.now());
    }

    public LicnaKarta getByKorisnik(Korisnik korisnik) {
        return korisnikRepository.findById(korisnik.getId()).orElseThrow(NoSuchElementException::new).getLicnaKarta();
    }
}
