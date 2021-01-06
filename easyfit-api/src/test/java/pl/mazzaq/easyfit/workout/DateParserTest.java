package pl.mazzaq.easyfit.workout;

import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class DateParserTest {

    @Test
    void testParser() {
        Timestamp timestamp = Timestamp.valueOf("2018-11-12 01:02:03");
        String result = timestamp.toLocalDateTime().toString();
        System.out.println(result);
        assertNotNull(result);
    }
}