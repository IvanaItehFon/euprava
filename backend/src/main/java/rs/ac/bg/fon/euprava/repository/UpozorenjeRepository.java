package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.Upozorenje;

import java.util.Optional;

@Repository
public interface UpozorenjeRepository extends JpaRepository<Upozorenje, Long> {
    Optional<Upozorenje> findByKorisnikIdAndLicnaKartaId(Long korisnikId, Long licnaKartaId);
    boolean existsByKorisnikIdAndLicnaKartaId(Long korisnikId, Long licnaKartaId);
    boolean existsByKorisnikIdAndPasosId(Long korisnikId, Long pasosId);
    Page<Upozorenje> findByKorisnikId(Long korisnikId, Pageable pageable);
    Optional<Upozorenje> findByKorisnikIdAndPasosId(Long korisnikId, Long pasosId);
}
