package pl.mazzaq.easyfit.workout.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.mazzaq.easyfit.workout.dto.TemplateOutput;
import pl.mazzaq.easyfit.workout.service.TemplateService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/templates")
public class TemplateController {

    private final TemplateService templateService;

    @Autowired
    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping()
    public List<TemplateOutput> getAll() {
        Collection<TemplateOutput> templates = templateService.readAll();
        log.info("Successfully read templates");
        return new ArrayList<>(templates);
    }
}
