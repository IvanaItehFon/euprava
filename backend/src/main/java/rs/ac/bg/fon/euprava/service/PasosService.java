package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.Pasos;
import rs.ac.bg.fon.euprava.repository.PasosRepository;

import java.time.LocalDate;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PasosService {

    private final PasosRepository pasosRepository;

    public Pasos sacuvajPasos(Pasos pasos) {
        return pasosRepository.save(pasos);
    }

    public void invalidirajTrenutniPasos(Korisnik korisnik) {
        Pasos pasos = pasosRepository.findByKorisnikId(korisnik.getId()).orElseThrow(NoSuchElementException::new);
        pasos.setDatumVazenja(LocalDate.now());
    }

    public Pasos getByKorisnik(Korisnik korisnik) {
        return pasosRepository.findByKorisnikId(korisnik.getId()).orElseThrow(NoSuchElementException::new);
    }
}
