package rs.ac.bg.fon.euprava.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.StatusZahteva;
import rs.ac.bg.fon.euprava.domain.TipUsluge;
import rs.ac.bg.fon.euprava.domain.Zahtev;

@Repository
public interface ZahtevRepository extends JpaRepository<Zahtev, Long> {
    Page<Zahtev> findByPodnosilacIdAndStatusZahteva(Long id, StatusZahteva statusZahteva, Pageable pageable);
    Page<Zahtev> findByPodnosilacId(Long podnosilacId, Pageable pageable);
    Page<Zahtev> findByPodnosilac(Korisnik podnosilac, Pageable pageable);

    Page<Zahtev> findByTipUsluge(TipUsluge tipUsluge, Pageable pageable);

    Page<Zahtev> findByStatusZahteva(StatusZahteva statusZahteva, Pageable pageable);

    Page<Zahtev> findByPodnosilacIdAndTipUsluge(Long korisnikId, TipUsluge tipUsluge, Pageable pageable);
}
