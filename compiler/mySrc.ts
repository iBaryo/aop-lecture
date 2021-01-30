// type Loading = boolean; // was changed to...
type Loading = {isLoading: boolean; reason: string; };

function isLoading(): Loading {
    return {
        reason: 'because',
        isLoading: true
    };
}

function triggerLoading(): Loading {
    return {
        reason: 'because',
        isLoading: true
    };
}


function go() {
    if (isLoading()) {
        console.log(`loading`);
    }
}

class A {
    public work() {
        if (!triggerLoading()) {
            console.log('work');
        }
    }
}
