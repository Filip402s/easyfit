package pl.mazzaq.easyfit.template.dto;

import org.springframework.stereotype.Component;
import pl.mazzaq.easyfit.template.repository.entities.Template;

@Component
public class TemplateConverter {

    public TemplateOutput convert(Template template) {
        return of(template);
    }

    private static TemplateOutput of(Template template) {
        return new TemplateOutput(
                template.getId(),
                template.getName());
    }
}
