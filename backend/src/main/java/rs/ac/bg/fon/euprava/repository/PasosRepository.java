package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.Pasos;

import java.util.Optional;

@Repository
public interface PasosRepository extends JpaRepository<Pasos, Long> {
    Optional<Pasos> findByKorisnikId(Long id);
}
