package rs.ac.bg.fon.euprava.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import rs.ac.bg.fon.euprava.auth.AuthenticationService;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.Pol;

import static rs.ac.bg.fon.euprava.domain.Role.ADMIN;

@Component
@RequiredArgsConstructor
public class Seeder {

    private final AuthenticationService authenticationService;

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        seedUsersTable();
    }

    private void seedUsersTable() {
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
