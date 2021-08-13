package com.github.wxpay.sdk;

import com.lkd.conf.WXConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;

/**
 * @author Administrator
 */
@Component
public class WxPaySdkConfig extends WXPayConfig {

    @Autowired
    private WXConfig wxConfig;

    @Override
    public String getAppID() {
        return wxConfig.getAppId();
    }

    @Override
    public WXPayConstants.SignType getSignType() {
        return null;
    }

    @Override
    public String getMchID() {
        return wxConfig.getMchId();
    }

    @Override
    public String getKey() {
        return wxConfig.getPartnerKey();
    }

    @Override
    public InputStream getCertStream() {
        return null;
    }

    @Override
    public IWXPayDomain getWXPayDomain() {
        return new IWXPayDomain() {
            @Override
            public void report(String s, long l, Exception e) {

            }

            @Override
            public DomainInfo getDomain(WXPayConfig wxPayConfig) {
                return new DomainInfo("api.mch.weixin.qq.com", true);
            }
        };
    }
}