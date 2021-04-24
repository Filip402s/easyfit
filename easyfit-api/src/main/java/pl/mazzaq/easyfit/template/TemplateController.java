package pl.mazzaq.easyfit.template;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.mazzaq.easyfit.template.dto.TemplateButton;
import pl.mazzaq.easyfit.template.service.TemplateService;
import pl.mazzaq.easyfit.template.dto.TemplateOutput;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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
    public List<TemplateButton> getAllButtons() {
        Collection<TemplateButton> templatesButtons = templateService.getTemplatesButtons();
        log.info("Successfully read templates");
        return new ArrayList<>(templatesButtons);
    }

    @GetMapping("/{id}")
    public Optional<TemplateOutput> getById(Integer id) {
        return templateService.readById(id);
    }
}
