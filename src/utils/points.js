let points = document.querySelector('#game-points span');

export let setPointsValue = (value) => {
    points.innerText = `${value}`;
};
