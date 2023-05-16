package rs.ac.bg.fon.euprava.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.euprava.domain.Upozorenje;
import rs.ac.bg.fon.euprava.service.UpozorenjeService;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/upozorenja")
public class UpozorenjeController {
    //slanje na email

    private final UpozorenjeService upozorenjeService;

    @GetMapping
    public Page<Upozorenje> getAll(Pageable pageable) {
        return upozorenjeService.getAll(pageable);
    }

    @GetMapping("/korisnik/{korisnikId}")
    public Page<Upozorenje> getAllZaKorisnika(@PathVariable Long korisnikId, Pageable pageable) {
        return upozorenjeService.getAllZaKorisnika(korisnikId, pageable);
    }
}
