package pl.mazzaq.easyfit.template.repository.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.mazzaq.easyfit.template.repository.entities.enums.InputType;
import pl.mazzaq.easyfit.workout.repository.entities.Exercise;
import pl.mazzaq.easyfit.workout.repository.entities.Workout;

import javax.persistence.*;
import java.time.temporal.TemporalAccessor;

@Data
@NoArgsConstructor
@ToString
@Entity
public class FieldData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "field_id", nullable = false)
    private Field field;

    private String name;

    @Enumerated(EnumType.STRING)
    private InputType type;

    private Integer position;

    @ManyToOne
    @JoinColumn(name = "template_id", nullable = false)
    private Template template;

    public FieldData(String name, InputType type, Integer position, Template template) {
        this.name = name;
        this.type = type;
        this.position = position;
        this.template = template;
    }
}
