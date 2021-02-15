package pl.mazzaq.easyfit.workout.share.twitter;

import com.github.redouane59.twitter.TwitterClient;
import com.github.redouane59.twitter.dto.tweet.Tweet;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class EasyfitTwitterService {

    private final EasyfitTwitterClientProvider twitterClientProvider;

    @Autowired
    public EasyfitTwitterService(EasyfitTwitterClientProvider twitterClientProvider) {
        this.twitterClientProvider = twitterClientProvider;
    }

    public EasyfitTweet postTweet(String content) {
        log.info("Trying to POST tweet with content {}", content);
        TwitterClient twitterClient = twitterClientProvider.getTwitterClient();
        Tweet tweetResponse = twitterClient.postTweet(content);
        if (tweetResponse.getId() == null) {
            log.error("Error when trying to post tweet with content length: {}", content.length());
            return new EasyfitTweet(tweetResponse, content.length(), false);
        }
        EasyfitTweet tweetInfo = new EasyfitTweet(tweetResponse, content.length());
        log.info("Tweet info: {}", tweetInfo.toString());
        return tweetInfo;
    }

}
