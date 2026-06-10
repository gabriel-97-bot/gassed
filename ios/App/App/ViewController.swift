import UIKit
import Capacitor

class ViewController: CAPBridgeViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(red: 26/255, green: 26/255, blue: 26/255, alpha: 1)
        // Extend layout under status bar and home indicator
        edgesForExtendedLayout = .all
        extendedLayoutIncludesOpaqueBars = true
        // Disable inset adjustments for full-screen layout
        webView?.scrollView.contentInsetAdjustmentBehavior = .never
    }
}
