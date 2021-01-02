package pl.mazzaq.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
public class WorkoutController {

    private final static Logger log = Logger.getLogger(WorkoutController.class.getName());

    @GetMapping
    public String getHello() {
        log.info("HELLO TEST");
        return "Hello";
    }

    @PostMapping("/workout")
    public String workout() {
        log.info("HELLO WORKOUT");
        return "Hello workout";
    }
}
