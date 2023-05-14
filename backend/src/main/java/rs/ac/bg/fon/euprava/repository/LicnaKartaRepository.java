package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;

import java.util.Optional;

@Repository
public interface LicnaKartaRepository extends JpaRepository<LicnaKarta, Long> {
    Optional<LicnaKarta> findByKorisnikId(Long korisnikId);
}
