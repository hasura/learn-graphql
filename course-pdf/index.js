const fs = require('fs');
const { execSync, spawnSync } = require('child_process');

const merge = require('easy-pdf-merge');

const tutorialPath = '../tutorials/'
const backendBasePath = tutorialPath + 'backend/'
const frontendBasePath = tutorialPath + 'frontend/'
const graphqlBasePath = tutorialPath + 'graphql/'
const pdfConfig = '../../../../course-pdf/config.js';

const courses = [
	{
		name: 'hasura-basics',
		basePath: backendBasePath + 'hasura/tutorial-site/',
		frontCoverPath:  'cover-images/hasura-basics.pdf',
	},
	{
		name: 'intro-graphql',
		basePath: graphqlBasePath + 'intro-graphql/tutorial-site/',
		frontCoverPath:  'cover-images/intro-graphql.pdf',
	}
]

const cleanup_files = async() => {
	// remove youtube embeds
	const youtube_command = "find . -type f -name '*md' | xargs sed -i '' '/^import YoutubeEmbed from/d'";
	const stdout_yt = execSync(youtube_command, { cwd: tutorialPath } );

	// remove twitter share
	const twitter_command = "find . -type f -name '*md' | xargs sed -i '' '/^import TwitterShare from/d'";
	const stdout_twit = execSync(twitter_command, { cwd: tutorialPath } );

	// remove community author
	const author_command = "find . -type f -name '*md' | xargs sed -i '' '/^import CommunityAuthor from/d'";
	const stdout_author = execSync(author_command, { cwd: tutorialPath } );
}

const generate_pdf = async(course) => {

	const basePath = course.basePath;
	//const current_command = `md-to-pdf --config-file ${pdfConfig} ./**/*.md`;
	//const stdout = execSync(current_command, { cwd: basePath } );
	const filePathSorted = [];
	let rawFilePaths = '';
	let rawFilePathsPdf = '';

	// add front cover
	rawFilePathsPdf += '../../../../../course-pdf/' + course.frontCoverPath + ' '

	const tree_cmd = `tree -J -P '*.md'`;
	const treeOut = execSync(tree_cmd, { cwd: basePath + 'content/' }).toString();
	const parsedTree = JSON.parse(treeOut);
	const treeContents = parsedTree[0].contents;
	console.log(treeContents);

	const configPath = basePath + 'config.js';
	const fileContents = require(configPath);
	const sortConfig = fileContents.sidebar.forcedNavOrder;
	sortConfig.map((file, index) => {
		const current_file = file.replace(/\//g,'');
		// convert current_file
		console.log(current_file)
		filePathSorted.push(basePath + 'content/' + current_file + '.pdf')
		rawFilePaths += current_file + '.md '
		rawFilePathsPdf += current_file + '.pdf '
		// generate PDF
		const pandoc_cmd = `pandoc -t html5 --css ../../../../../course-pdf/github.css --highlight-style ../../../../../course-pdf/pygments.theme ${current_file}.md -o ${current_file}.pdf`
		const stdout = execSync(pandoc_cmd, { cwd: basePath + 'content/' } );

		// find if there is a directory with this file name
		const filteredPath = treeContents.filter( file => file.type === 'directory' && file.name === current_file)
		if (filteredPath.length) {
			// nested content inside
			const filteredContents = filteredPath[0].contents;
			console.log(filteredContents);
			filteredContents.forEach((file) => {
				filePathSorted.push(basePath + 'content/' + current_file + '/' + file.name.replace('.md','.pdf')) // pdf suffix not needed here
				rawFilePaths += current_file + '/' + file.name + ' '
				rawFilePathsPdf += (current_file + '/' + file.name.replace('.md','.pdf') + ' ')

				const pandoc_cmd = `pandoc -t html5 --css ../../../../../course-pdf/github.css --highlight-style ../../../../../course-pdf/pygments.theme ${current_file}/${file.name} -o ${current_file}/${file.name.replace('.md','')}.pdf`
				const stdout = execSync(pandoc_cmd, { cwd: basePath + 'content/' } );
			})
		}
		console.log(filePathSorted);
	})


	// perform the PDF merge
	/*
	merge(filePathSorted,'./hasura.pdf',function(err){
		if(err) {
			return console.log(err)
		}
		console.log('Success')
	});
	*/

	const gs_command = `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=../../../../../course-pdf/${course.name}.pdf ${rawFilePathsPdf}`
	const stdout = execSync(gs_command, { cwd: basePath + 'content/' } );

}

// cleanup_files()

// generate PDF for all courses
courses.map((course, index) => {
	generate_pdf(course)
});

