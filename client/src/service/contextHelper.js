import React from 'react';

const GetContext = (thisContext, provider) => {
    const context = React.useContext(thisContext);

    if (!context) {
        throw new Error(`Needs to wrap in a provder: ${provider}`);
    }

    return context;
};

const GetProvider = (thisContext, state, setState, props) => {
    const value = React.useMemo(() => [state, setState], [state, setState]);

    return <thisContext.Provider value={value} {...props} />;
}

const makeContext = (context, contextString) => {
    function UseContext() {
        return GetContext(context, contextString);
    }

    function ContextProvider(props) {
        const [selectAll, setSelectAll] = React.useState([]);
        return GetProvider(context, selectAll, setSelectAll, props);
    }

    return { ContextProvider, UseContext };
};

export default makeContext;