package pl.mazzaq.easyfit.template.dto;

import org.springframework.stereotype.Component;
import pl.mazzaq.easyfit.template.repository.entities.Template;

@Component
public class TemplateConverter {

    public static TemplateButton convertToButtons(Template template) {
        if (template != null) {
            TemplateButton templateButton = new TemplateButton();
            templateButton.setId(template.getId());
            templateButton.setName(template.getName());
            return templateButton;
        }
        return null;
    }

    public TemplateOutput convert(Template template) {
        if (template != null) {
            TemplateOutput templateOutput = new TemplateOutput();
            templateOutput.setId(template.getId());
            templateOutput.setName(template.getName());
        }
        return null;
    }

}
