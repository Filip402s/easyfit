package pl.mazzaq.easyfit.workout.share.twitter;


import com.github.redouane59.twitter.TwitterClient;
import com.github.redouane59.twitter.signature.TwitterCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:twitter.properties")
@ConfigurationProperties(prefix = "easyfit")
public class EasyfitTwitterClientProvider {

    @Value("${apiKey}")
    String apiKey;

    @Value("${apiSecretKey}")
    String apiSecretKey;

    @Value("${accessToken}")
    String accessToken;

    @Value("${accessTokenSecret}")
    String accessTokenSecret;

    public TwitterClient getTwitterClient() {
        return new TwitterClient(TwitterCredentials.builder()
                .accessToken(accessToken)
                .accessTokenSecret(accessTokenSecret)
                .apiKey(apiKey)
                .apiSecretKey(apiSecretKey)
                .build());
    }
}
