package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.repository.KorisnikRepository;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class KorisnikService {

    private final KorisnikRepository korisnikRepository;

    public Page<Korisnik> getAll(Pageable pageable) {
        return korisnikRepository.findAll(pageable);
    }

    public Korisnik getById(Long id) {
        return korisnikRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Korisnik getKorisnikById(Long korisnikId) {
        return korisnikRepository.findById(korisnikId).orElseThrow(NoSuchElementException::new);
    }

    public Korisnik getTrenutnoUlogovani() {
        return (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Korisnik sacuvaj(Korisnik korisnik) {
        return korisnikRepository.save(korisnik);
    }
}
