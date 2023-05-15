package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;
import rs.ac.bg.fon.euprava.domain.Upozorenje;

import java.util.Optional;

@Repository
public interface UpozorenjeRepository extends JpaRepository<Upozorenje, Long> {
    Optional<Upozorenje> findByKorisnikIdAndLicnaKartaId(Long korisnikId, Long licnaKartaId);
    com.google.common.base.Optional<Upozorenje> findByKorisnik_IdAndKorisnik_LicnaKarta_Id(Long korisnikId, Long licnaKartaId);
    long deleteByKorisnikAndLicnaKarta(Korisnik korisnik, LicnaKarta licnaKarta);
    Optional<Upozorenje> findByKorisnikIdAndKorisnikLicnaKartaId(Long korisnikId, Long licnaKartaId);
//    boolean existsByKorisnikIdAndLicnaKartaBrojLicneKarte(Long id, Long brojLicneKarte);
//    boolean existsByKorisnikIdAndPasosBrojPasosa(Long korisnikId, Long brojPasosa);
    boolean existsByKorisnikIdAndLicnaKartaId(Long korisnikId, Long licnaKartaId);
    boolean existsByKorisnikIdAndPasosId(Long korisnikId, Long pasosId);
    Page<Upozorenje> findByKorisnikId(Long korisnikId, Pageable pageable);

    Optional<Upozorenje> findByKorisnikIdAndPasosId(Long korisnikId, Long pasosId);
}
