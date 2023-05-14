package rs.ac.bg.fon.euprava.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.bg.fon.euprava.config.JwtService;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;
import rs.ac.bg.fon.euprava.domain.Pasos;
import rs.ac.bg.fon.euprava.domain.Role;
import rs.ac.bg.fon.euprava.repository.KorisnikRepository;
import rs.ac.bg.fon.euprava.repository.LicnaKartaRepository;
import rs.ac.bg.fon.euprava.repository.PasosRepository;
import rs.ac.bg.fon.euprava.service.UpozorenjeService;

import java.util.NoSuchElementException;

import static rs.ac.bg.fon.euprava.domain.Role.KORISNIK;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final KorisnikRepository korisnikRepository;
    private final UpozorenjeService upozorenjeService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final LicnaKartaRepository licnaKartaRepository;
    private final PasosRepository pasosRepository;

    public AuthenticationResponse register(RegisterRequest request) {
        var korisnik = Korisnik.builder()
                .ime(request.getIme())
                .prezime(request.getPrezime())
                .email(request.getEmail())
                .pol(request.getPol())
                .jmbg(request.getJmbg())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.KORISNIK)
                .build();
        korisnikRepository.save(korisnik);

        LicnaKarta licnaKarta = LicnaKarta.builder()
                .datumIzdavanja(request.getLicnaKarta().getDatumIzdavanja())
                .datumVazenja(request.getLicnaKarta().getDatumIzdavanja())
                .brojLicneKarte(request.getLicnaKarta().getBrojLicneKarte())
                .korisnik(korisnik)
                .build();
        licnaKartaRepository.save(licnaKarta);

        Pasos pasos = Pasos.builder()
                .brojPasosa(request.getPasos().getBrojPasosa())
                .datumIzdavanja(request.getPasos().getDatumIzdavanja())
                .datumVazenja(request.getPasos().getDatumVazenja())
                .korisnik(korisnik)
                .build();
        pasosRepository.save(pasos);

        var jwtToken = jwtService.generateToken(korisnik);
        return new AuthenticationResponse(jwtToken, Role.KORISNIK);
    }

    public Korisnik register(Korisnik korisnik) {
        korisnik.setPassword(passwordEncoder.encode(korisnik.getPassword()));
        return korisnikRepository.save(korisnik);
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));
        Korisnik korisnik = korisnikRepository.findByUsername(request.getUsername()).orElseThrow(NoSuchElementException::new);
        if (korisnik.getRole().equals(KORISNIK)) {
            upozorenjeService.proveriKorisnika(korisnik);
        }
        String jwtToken = jwtService.generateToken(korisnik);
        return new AuthenticationResponse(jwtToken, korisnik.getRole());
    }
}
