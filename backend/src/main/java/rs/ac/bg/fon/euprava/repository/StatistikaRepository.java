package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.StatistikaObrade;

import java.util.Optional;

@Repository
public interface StatistikaRepository extends JpaRepository<StatistikaObrade, Long> {
    Optional<StatistikaObrade> findByZahtevId(Long id);
}
