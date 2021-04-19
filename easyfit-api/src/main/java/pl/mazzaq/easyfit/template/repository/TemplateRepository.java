package pl.mazzaq.easyfit.template.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.mazzaq.easyfit.template.repository.entities.Template;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Integer> {
}
