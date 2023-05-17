package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.Pasos;
import rs.ac.bg.fon.euprava.repository.KorisnikRepository;
import rs.ac.bg.fon.euprava.repository.PasosRepository;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PasosService {

    private final PasosRepository pasosRepository;
    private final KorisnikRepository korisnikRepository;

    public Pasos sacuvajPasos(Pasos pasos) {
        return pasosRepository.save(pasos);
    }

    public void invalidirajTrenutniPasos(Korisnik korisnik) {
        Pasos pasos = getByKorisnik(korisnik);
        if(pasos.getDatumVazenja().isAfter(LocalDate.now())) {
            pasos.setDatumVazenja(LocalDate.now());
        }
    }

    public Pasos getByKorisnik(Korisnik korisnik) {
        return korisnikRepository.findById(korisnik.getId()).orElseThrow(NoSuchElementException::new).getPasos();
    }
}
