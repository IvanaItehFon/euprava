package rs.ac.bg.fon.euprava.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.repository.KorisnikRepository;

@Service
@RequiredArgsConstructor
public class UserService {
    private final KorisnikRepository korisnikRepository;

    public Korisnik getTrenutnoUlogovaniKorisnik() {
        return (Korisnik) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
