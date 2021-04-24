package pl.mazzaq.easyfit.template.dto;


import lombok.Value;

@Value
public class FieldDataOutput {

    private Integer id;
    private String fieldName;
    private String type;
    private Integer position;
}
