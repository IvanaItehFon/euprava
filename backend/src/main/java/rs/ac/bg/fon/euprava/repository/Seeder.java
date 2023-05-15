package rs.ac.bg.fon.euprava.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.bg.fon.euprava.auth.AuthenticationService;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.Pol;

import static rs.ac.bg.fon.euprava.domain.Role.ADMIN;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/seed")
@RequiredArgsConstructor
public class Seeder {

    private final AuthenticationService authenticationService;


    @GetMapping
    public void seedUsersTable() {
        Korisnik admin = Korisnik.builder()
                .ime("Admin")
                .prezime("Admin")
                .email("admin@euprava.com")
                .jmbg("1234568790123")
                .pol(Pol.MUSKI)
                .username("admin")
                .password("admin")
                .role(ADMIN)
                .build();
        authenticationService.register(admin);
    }
}
