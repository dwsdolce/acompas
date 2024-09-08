package audio.acompas.app;

import android.content.Intent;
import android.os.Bundle;
import audio.acompas.app.AppRestartPlugin;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  private FrameLayout mLayout;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Splash screen
        mLayout = new FrameLayout(this);
        setContentView(mLayout);

        getLayoutInflater().inflate(R.layout.splash_layout, mLayout);

        // Register the AppRestart plugin
        registerPlugin(AppRestartPlugin.class);

        if (getIntent().getBooleanExtra("RESTART_AFTER_UPDATE", false)) {
            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
            finish();
            return;
        }
    }

    @Override
    public void onStart() {
        super.onStart();

        // Remove the splash screen once the app is started
        getBridge().getWebView().setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                ViewGroup parent = (ViewGroup) view.getParent();
                if (parent != null) {
                    parent.removeView(view);
                }
                mLayout.removeAllViews();
                mLayout.addView(view);
            }
        });
    }

    public void restartApp() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("RESTART_AFTER_UPDATE", true);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
