package pl.mazzaq.easyfit.template.repository.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private boolean isStartTime;

    @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
    private List<FieldData> fields;

    public Template(String name) {
        this.name = name;
    }
}