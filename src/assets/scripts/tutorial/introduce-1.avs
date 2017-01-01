/* 场景操作与特效 */

api.showText("下面演示一下场景的加载 ~");

api.loadScene(0, "tutorial/s3.png");
api.wait(1000);
api.loadScene(1, "tutorial/s2.png");
api.wait(1000);
api.loadScene(2, "tutorial/s1.png");

api.wait(3000);

api.removeScene(0);
api.wait(1000);

api.removeScene(1);
api.wait(1000);

api.removeScene(2);

