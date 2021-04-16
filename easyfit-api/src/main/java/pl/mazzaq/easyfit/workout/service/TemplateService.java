package pl.mazzaq.easyfit.workout.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.workout.dto.TemplateConverter;
import pl.mazzaq.easyfit.workout.dto.TemplateInput;
import pl.mazzaq.easyfit.workout.dto.TemplateOutput;
import pl.mazzaq.easyfit.workout.repository.TemplateRepository;
import pl.mazzaq.easyfit.workout.repository.entities.Template;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class TemplateService implements TemplateCrudService {

    private final TemplateRepository templateRepository;
    private final TemplateConverter templateConverter;
    private List<Template> templates;


    @Autowired
    public TemplateService(TemplateRepository templateRepository, TemplateConverter templateConverter) {
        this.templateRepository = templateRepository;
        this.templateConverter = templateConverter;
        templates = new ArrayList<>();
        templates.add(new Template(1, "Diet"));
        templates.add(new Template(2, "Health"));
        templates.add(new Template(3, "Workout"));
    }

    @Override
    public Optional<TemplateOutput> readById(Integer id) {
        return templateRepository.findById(id)
                .map(templateConverter::convert);
    }

    @Override
    public Collection<TemplateOutput> readAll() {
        log.info("Getting templates...");

        return templates.stream()
                .map(templateConverter::convert)
                .collect(Collectors.toList());
    }

    @Override
    public TemplateOutput create(TemplateInput templateInput) {
        Template template = new Template(templateInput.getName());
        log.info("Saving to repository template {}", template);
        Template templateFromDb = templateRepository.save(template);
        log.info("Template {} succesfully saved", template);
        return templateConverter.convert(templateFromDb);
    }

    @Override
    public boolean delete(Integer templateId) {
        Optional<Template> optionalTemplate = templateRepository.findById(templateId);
        if (optionalTemplate.isPresent()) {
            templateRepository.delete(optionalTemplate.get());
            log.info("Template with id: {} deleted", templateId);
            return true;
        }
        log.warn("Did not find matching template to delete, id: {}", templateId);
        return false;
    }

    @Override
    public void deleteAll() {
        templateRepository.deleteAll();
        log.info("All Templates successfully deleted");
    }
}
