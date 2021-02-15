package pl.mazzaq.easyfit.workout.share.twitter;

import com.github.redouane59.twitter.dto.tweet.Tweet;
import lombok.Value;

@Value
public class EasyfitTweet {

    Tweet tweet;
    String info;
    boolean success;

    public EasyfitTweet(Tweet tweetResponse, int length, boolean success) {
        this.success = success;
        this.tweet = tweetResponse;
        this.info = getInfo(tweetResponse, length);
    }

    public EasyfitTweet(Tweet tweetResponse, int length) {
        this.success = true;
        this.tweet = tweetResponse;
        this.info = getInfo(tweetResponse, length);
    }

    private String getInfo(Tweet tweetResponse, int length) {
        if (tweetResponse.getId() == null) {
            return String.format("Error, length: %s", length);
        } else {
            return String.format("TweetId: %s, AuthorId: %s, Text: %s, Length: %s",
                    tweetResponse.getId(),
                    tweetResponse.getAuthorId(),
                    tweetResponse.getText(),
                    length);
        }
    }

    @Override
    public String toString() {
        return info;
    }
}
