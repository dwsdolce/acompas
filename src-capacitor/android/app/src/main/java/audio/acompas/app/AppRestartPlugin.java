package audio.acompas.app;

import audio.acompas.app.MainActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "AppRestart")
public class AppRestartPlugin extends Plugin {

    @PluginMethod
    public void restart(PluginCall call) {
        if (getActivity() instanceof MainActivity) {
            ((MainActivity) getActivity()).restartApp();
            call.resolve();
        } else {
            call.reject("Unable to restart app");
        }
    }
}
