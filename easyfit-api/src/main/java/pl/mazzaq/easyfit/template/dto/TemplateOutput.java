package pl.mazzaq.easyfit.template.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.mazzaq.easyfit.template.repository.entities.FieldData;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class TemplateOutput {

    private Integer id;
    private String name;
    private boolean isStartTime;
    private List<FieldDataOutput> fields;
}


