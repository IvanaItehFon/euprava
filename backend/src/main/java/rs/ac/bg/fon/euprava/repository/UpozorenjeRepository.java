package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.Upozorenje;

@Repository
public interface UpozorenjeRepository extends JpaRepository<Upozorenje, Long> {
//    boolean existsByKorisnikIdAndLicnaKartaBrojLicneKarte(Long id, Long brojLicneKarte);
//    boolean existsByKorisnikIdAndPasosBrojPasosa(Long korisnikId, Long brojPasosa);
    boolean existsByKorisnikIdAndLicnaKartaId(Long korisnikId, Long licnaKartaId);
    boolean existsByKorisnikIdAndPasosId(Long korisnikId, Long pasosId);
    Page<Upozorenje> findByKorisnikId(Long korisnikId, Pageable pageable);
}
