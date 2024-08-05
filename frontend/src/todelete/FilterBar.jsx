import React, { useState } from 'react';
import {
    EuiButton,
    EuiFlyout,
    EuiFlyoutBody,
    EuiText,
    useGeneratedHtmlId,
} from '@elastic/eui';

function FilterBar() {
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
            <EuiButton onClick={() => setIsFlyoutVisible(!isFlyoutVisible)}>
                Show flyout
            </EuiButton>
            {flyout}
        </div>
    );
}

export default FilterBar;
