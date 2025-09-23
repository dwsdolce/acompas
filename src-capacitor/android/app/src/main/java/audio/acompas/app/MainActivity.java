package audio.acompas.app;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		// Ensure the system insets (status bar) are applied to the content
		WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
	}
}
