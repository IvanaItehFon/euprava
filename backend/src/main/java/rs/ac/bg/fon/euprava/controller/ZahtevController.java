package rs.ac.bg.fon.euprava.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.euprava.domain.Odgovor;
import rs.ac.bg.fon.euprava.domain.StatusZahteva;
import rs.ac.bg.fon.euprava.domain.TipUsluge;
import rs.ac.bg.fon.euprava.domain.Zahtev;
import rs.ac.bg.fon.euprava.service.ZahtevService;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/zahtevi")
public class ZahtevController {

    private final ZahtevService zahtevService;

    @GetMapping
    public Page<Zahtev> getAll(Pageable pageable) {
        return zahtevService.getAll(pageable);
    }

    @GetMapping("/{zahtevId}")
    public Zahtev getById(@PathVariable Long zahtevId) {
        return zahtevService.getById(zahtevId);
    }

    @PostMapping
    public Zahtev saveZahtev(@RequestBody Zahtev zahtev) {
        return zahtevService.saveZahtev(zahtev);
    }

    @GetMapping("/tipUsluge/{tipUsluge}")
    public Page<Zahtev> getAllByTipUsluge(@PathVariable TipUsluge tipUsluge, Pageable pageable) {
        return zahtevService.getAllByTipUsluge(tipUsluge, pageable);
    }

    @GetMapping("/statusZahteva/{statusZahteva}")
    public Page<Zahtev> getAllByStatusZahteva(@PathVariable StatusZahteva statusZahteva, Pageable pageable) {
        return zahtevService.getAllByStatusZahteva(statusZahteva, pageable);
    }

    @GetMapping("/podnosilac/{podnosilacId}")
    public Page<Zahtev> getAllByKorisnik(@PathVariable Long podnosilacId, Pageable pageable) {
        return zahtevService.getAllByKorisnik(podnosilacId, pageable);
    }

    @PostMapping("/{zahtevId}/razresi")
    public Odgovor razresi(@PathVariable Long zahtevId) {
        return zahtevService.razresi(zahtevId);
    }
}
