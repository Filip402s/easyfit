package pl.mazzaq.easyfit.template.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.mazzaq.easyfit.template.dto.*;
import pl.mazzaq.easyfit.template.repository.TemplateRepository;
import pl.mazzaq.easyfit.template.repository.entities.Field;
import pl.mazzaq.easyfit.template.repository.entities.FieldData;
import pl.mazzaq.easyfit.template.repository.entities.Template;
import pl.mazzaq.easyfit.template.repository.entities.enums.InputType;

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
    private List<TemplateOutput> templateOutputList;


    @Autowired
    public TemplateService(TemplateRepository templateRepository, TemplateConverter templateConverter) {
        this.templateRepository = templateRepository;
        this.templateConverter = templateConverter;
//        templateOutputList = new ArrayList<>();
//        bootstrapTemplates();
    }

    @Override
    public Optional<TemplateOutput> readById(Integer id) {
        return templateRepository.findById(id)
                .map(templateConverter::convert);
    }


    @Override
    public Collection<TemplateOutput> readAll() {
        log.info("Getting templates...");
        return templateRepository.findAll().stream().map(templateConverter::convert).collect(Collectors.toList());
    }

    public Collection<TemplateButton> getTemplatesButtons() {
        log.info("Getting templates buttons...");
        return templateRepository.findAll().stream().map(TemplateConverter::convertToButtons).collect(Collectors.toList());

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

    private void bootstrapTemplates() {
        FieldDataOutput firstField = new FieldDataOutput(1, "cold shower", "checkbox", 1);
        FieldDataOutput secondField = new FieldDataOutput(2, "drinking water", "number", 2);
        FieldDataOutput thirdField = new FieldDataOutput(3, "meditation", "checkbox", 3);
        FieldDataOutput fourthField = new FieldDataOutput(4, "wake up early", "checkbox", 4);

        List<FieldDataOutput> firstFieldList = new ArrayList<>();
        List<FieldDataOutput> secondFieldList = new ArrayList<>();
        List<FieldDataOutput> thirdFieldList = new ArrayList<>();
        List<FieldDataOutput> fourthFieldList = new ArrayList<>();

        firstFieldList.add(firstField);
        firstFieldList.add(secondField);
        secondFieldList.add(firstField);
        secondFieldList.add(thirdField);
        fourthFieldList.add(thirdField);
        fourthFieldList.add(fourthField);

        TemplateOutput firstTemplate = new TemplateOutput(1, "Diet", true, firstFieldList);
        TemplateOutput secondTemplate = new TemplateOutput(2, "Health", true, secondFieldList);
        TemplateOutput thirdTemplate = new TemplateOutput(3, "Habits", true, thirdFieldList);

        templateOutputList.add(firstTemplate);
        templateOutputList.add(secondTemplate);
        templateOutputList.add(thirdTemplate);

    }
}
