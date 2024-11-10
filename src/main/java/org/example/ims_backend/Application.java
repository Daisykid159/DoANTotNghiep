package org.example.ims_backend;

import org.example.ims_backend.config.RSAKeyRecord;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableConfigurationProperties(RSAKeyRecord.class)
@EnableAsync
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

}
