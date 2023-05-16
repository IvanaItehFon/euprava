package rs.ac.bg.fon.euprava.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.euprava.domain.Korisnik;
import rs.ac.bg.fon.euprava.domain.LicnaKarta;
import rs.ac.bg.fon.euprava.domain.Pasos;
import rs.ac.bg.fon.euprava.service.KorisnikService;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/korisnici")
public class KorisnikController {

    private final KorisnikService korisnikService;

    @GetMapping
    public Page<Korisnik> getAll(Pageable pageable) {
        return korisnikService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Korisnik getById(@PathVariable Long id) {
        return korisnikService.getById(id);
    }

    @GetMapping("/trenutni")
    public Korisnik getTrenutnoUlogovaniKorisnik() {
        return korisnikService.getTrenutnoUlogovani();
    }

    @GetMapping("/{korisnikId}/licnaKarta")
    public LicnaKarta getLicnaKartaZaKorisnika(@PathVariable Long korisnikId) {
        return korisnikService.getLicnaKartaZaKorisnika(korisnikId);
    }
    @GetMapping("/{korisnikId}/pasos")
    public Pasos getPasosZaKorisnika(@PathVariable Long korisnikId) {
        return korisnikService.getPasosZaKorisnika(korisnikId);
    }


}
