import React, { useState } from 'react';
import {
    EuiButton,
    EuiFlyout,
    EuiFlyoutBody,
    EuiText,
    EuiProvider,
    useGeneratedHtmlId,
} from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';

function FilterNonsense() {
    const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
    const simpleFlyoutTitleId = useGeneratedHtmlId({
        prefix: 'simpleFlyoutTitle',
    });

    let flyout;
    if (isFlyoutVisible) {
        flyout = (
            <EuiFlyout size="s" aria-labelledby={simpleFlyoutTitleId} onClose={() => setIsFlyoutVisible(false)}>
                <EuiFlyoutBody>
                    <EuiText>
                        <p>
                            hello world
                        </p>
                    </EuiText>
                </EuiFlyoutBody>
            </EuiFlyout>
        );
    }

    return (
        <div>
            <EuiProvider colorMode="dark">
                <EuiText><p>Hello World!</p></EuiText>
                <EuiButton onClick={() => setIsFlyoutVisible(!isFlyoutVisible)}>
                    Show flyout
                </EuiButton>
                {flyout}
            </EuiProvider>
        </div>
    );
}

export default FilterNonsense;
