export function getParamKeysUpToStep(questions, step) {
    const keys = [];

    function collectKeys(qList, depth = 0) {
        for (let i = 0; i < qList.length; i++) {
            const q = qList[i];
            if (keys.length === step - 1) return; // stop at step - 1
            keys.push(q.paramKey);
            if (q.subQuestion) collectKeys([q.subQuestion]);
        }
    }

    collectKeys(questions);
    return keys;
}

export function getAllParamKeys(questions) {
    const keys = [];

    function collectKeys(q) {
        if (q.paramKey) keys.push(q.paramKey);
        if (q.subQuestion) collectKeys(q.subQuestion);
    }

    for (const q of questions) {
        collectKeys(q);
    }

    return keys;
}

export default {
	getParamKeysUpToStep,
	getAllParamKeys
};
