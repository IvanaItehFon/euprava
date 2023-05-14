package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.Odgovor;

@Repository
public interface OdgovorRepository extends JpaRepository<Odgovor, Long> {
}
