package ro.simavi.sphinx.id.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000",
                        "http://localhost:3001",
                        "http://localhost:7343",
                        "http://localhost:3002",
                        "http://localhost:3003",
                        "http://localhost:1337",
                        "http://localhost:1338",
                        "http://localhost:80",
                        "http://172.18.0.6:3001",
                        "http://interactive-dashboards:3000")
                .allowCredentials(false).maxAge(3600);
    }
}