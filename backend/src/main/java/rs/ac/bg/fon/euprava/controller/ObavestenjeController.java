package rs.ac.bg.fon.euprava.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import rs.ac.bg.fon.euprava.domain.Obavestenje;
import rs.ac.bg.fon.euprava.service.ObavestenjeService;


@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/obavestenja")
public class ObavestenjeController {

    private final ObavestenjeService obavestenjeService;

    @GetMapping
    public Page<Obavestenje> getAll(Pageable pageable) {
        return obavestenjeService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public Obavestenje getById(@PathVariable long id) {
        return obavestenjeService.getById(id);
    }

    @PostMapping
    public Obavestenje postaviObavestenje(@RequestBody Obavestenje obavestenje) {
        return obavestenjeService.postaviObavestenje(obavestenje);
    }

    @DeleteMapping("/{id}")
    public void deleteObavestenje(@PathVariable Long id) {
        obavestenjeService.deleteObavestenje(id);
    }
}
