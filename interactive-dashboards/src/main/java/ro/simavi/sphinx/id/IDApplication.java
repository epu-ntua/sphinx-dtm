package ro.simavi.sphinx.id;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Locale;

@SpringBootApplication
@EnableScheduling
public class IDApplication implements CommandLineRunner {

	@Autowired
	private MessageSource messageSource;

	private static final Logger logger = LoggerFactory.getLogger(IDApplication.class);

	public static void main(String[] args) throws InterruptedException {

		SpringApplication.run(IDApplication.class, args);


	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(messageSource.getMessage("welcome.text", null, new Locale("ro","RO")));
	}
}
