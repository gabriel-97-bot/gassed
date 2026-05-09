import UIKit
import Capacitor

class ViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 26/255, green: 26/255, blue: 26/255, alpha: 1)
        // Extend layout under status bar and home indicator
        edgesForExtendedLayout = .all
        extendedLayoutIncludesOpaqueBars = true
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        // Force WebView to fill the full UIWindow (behind Dynamic Island and home indicator)
        guard let window = view.window else { return }
        let fullBounds = window.bounds
        view.frame = fullBounds
        webView?.frame = fullBounds
        webView?.scrollView.contentInsetAdjustmentBehavior = .never
    }
}
